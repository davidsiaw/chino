# frozen_string_literal: true

require 'active_support/inflector'
require 'chino/drivers/base_driver'
require 'chino/drivers/path_driver'

module Chino
  # dependency puller
  class DepPuller
    NIL_DRIVER = Chino::Drivers::BaseDriver.new(nil)

    def initialize
      @dependencies = {}
    end

    def load_dependency!(dep)
      const_name = "#{dep[:driver].camelize}Driver"
      raise "No such driver '#{dep[:driver]}'" unless Drivers.const_defined?(const_name)

      driver_class = Drivers.const_get(const_name)
      driver = driver_class.new(dep)
      name = driver.name
      version = driver.version
      return unless @dependencies.dig(name, version).nil?

      @dependencies[name] ||= {}
      @dependencies[name][version] = driver

      driver.inner_deps.each do |inner_dep|
        load_dependency!(inner_dep)
      end
    end

    def dependency(file)
      depname = name_for_dependency(file)
      return NIL_DRIVER unless @dependencies.key?(depname)

      @dependencies[depname].values.first
    end

    def name_for_dependency(file)
      file.split('/').first
    end

    def get_from_dependency(file)
      dependency(file).load_file(file)
    end

    def dependency_has_file?(file)
      dependency(file).exist?(file)
    end
  end
end
