# frozen_string_literal: true

module Chino
  class Chinofile
    attr_accessor :information

    def initialize(path: `pwd`.chomp.to_s, &block)
      @information = defaults(path)

      instance_eval(&block)
    end

    def name(value)
      @information[:name] = value
    end

    def version(value)
      @information[:version] = value
    end

    def author(value)
      @information[:author] = value
    end

    def author_email(value)
      @information[:author_email] = value
    end

    def company_name(value)
      @information[:company_name] = value
    end

    def identifier(value)
      @information[:identifier] = value
    end

    def created_at(value)
      @information[:created_at] = value
    end

    def exports(filename)
      @information[:exports][filename] = File.join(@information[:path], filename)
    end

    def imports(hash = {})
      driver = hash.keys.first
      location = hash[driver]
      version = hash[:version]
      @information[:dependencies] << { driver: driver.to_s, version: version, location: location }
    end

    def find_file(filename)
      return @information[:exports][filename] if @information[:exports][filename]

      @information[:dependencies].map { |_k, v| v.find_file(filename) }.select { |x| x }.first
    end

    private

    def defaults(path)
      {
        path: path,
        dependencies: [],
        exports: {},
        name: 'UnnamedChinoProject',
        version: '0.1.0',
        author: 'Incognito',
        author_email: 'incognito@example.com',
        company_name: 'Incognito',
        identifier: "com.Incognito.UnnamedChinoProject",
        created_at: Time.now
      }
    end
  end
end
