# frozen_string_literal: true

module Chino
  module Drivers
    # base class for all dependency drivers
    class BaseDriver
      def initialize(dep)
        @dep = dep
      end

      def name
        ''
      end

      def version
        ''
      end

      def install!
      end

      def load_file(file)
        {}
      end

      def exist?(file)
        false
      end

      def inner_deps
        []
      end
    end
  end
end
