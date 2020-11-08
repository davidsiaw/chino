# frozen_string_literal: true

module Chino
  module Drivers
    # base class for all dependency drivers
    class PathDriver < BaseDriver
      def location
        @dep[:location]
      end

      def config
        @config ||= Config.new(file: File.join(location, 'Chinofile'))
      end

      def name
        config.bundle_name
      end

      def version
        config.bundle_version
      end

      def install!; end

      def load_file(file)
        return {} unless exist? file

        { filename: File.join(location, file) }
      end

      def exist?(file)
        config.bundle_exports.key?(file)
      end

      def inner_deps
        []
      end
    end
  end
end
