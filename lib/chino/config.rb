# frozen_string_literal: true

require 'erb'
require 'chino/dep_puller'

module Chino
  class Config
    def initialize(file: nil, _install: false)
      @path = File.basename(file || '')
      file ||= 'Chinofile'
      @dir = file.sub(%r{/?#{@path}$}, '')
      @chinofile = Chinofile.new(path: @path) do
        instance_eval File.read(file), file
      end
      @dep_puller = DepPuller.new

      @chinofile.information[:dependencies].each do |dep|
        @dep_puller.load_dependency!(dep)
      end
    end

    def bundle_name
      @chinofile.information[:name]
    end

    def bundle_version
      @chinofile.information[:version]
    end

    def bundle_author
      @chinofile.information[:author]
    end

    def bundle_author_email
      @chinofile.information[:author_email]
    end

    def bundle_company_name
      @chinofile.information[:company_name]
    end

    def bundle_identifier
      @chinofile.information[:identifier]
    end

    def bundle_created_at
      @chinofile.information[:created_at]
    end

    def bundle_exports
      @bundle_exports ||= convert_export_names
    end

    def convert_export_names
      result = {}

      @chinofile.information[:exports].each do |file, file_path|
        result[file] = file_path.sub(@path, @dir)
      end

      result
    end

    def data_path
      "#{Gem.loaded_specs['chino'].full_gem_path}/data/chino"
    end

    def common_path
      "#{data_path}/common"
    end

    def get_file(file)
      return { filename: file.to_s } if File.exist?(file.to_s)
      return erb(file) if File.exist?(erb_name(file))
      return { filename: "#{common_path}/#{file}" } if File.exist?("#{common_path}/#{file}")
      return get_from_dependency(file) if dependency_has_file?(file)

      splits = file.split('/', 2)
      list = Dir[[splits[0], '**', splits[1]].join('/')]
      log_list_length(list, splits)
      return { filename: list.last } unless list.empty?

      {}
    end

    def dependency_has_file?(file)
      @dep_puller.dependency_has_file?(file)
    end

    def get_from_dependency(file)
      @dep_puller.get_from_dependency(file)
    end

    def erb_name(file)
      "#{common_path}/#{file}.erb"
    end

    def erb(file)
      renderer = ERB.new(File.read(erb_name(file)))
      {
        string: renderer.result(binding)
      }
    end

    private

    def log_list_length(list, splits)
      if list.length > 1
        puts "**** NOT FOUND **** #{splits.inspect}"
        puts "RETURNING #{list.last.inspect}"
      end
    end
  end
end
