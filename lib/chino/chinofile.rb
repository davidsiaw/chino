
module Chino
	class Chinofile

		attr_accessor :information

		def initialize(&block)
			@information = {}
			instance_eval(&block)

			@information[:name] ||= "UnnamedChinoProject"
			@information[:version] ||= "0.1.0"
			@information[:author] ||= "Incognito"
			@information[:author_email] ||= "incognito@example.com"
			@information[:company_name] ||= "#{@information[:author]}"
			@information[:identifier] ||= "com.#{@information[:company_name].downcase.gsub(/[^a-z0-9]+/, "_")}.#{@information[:name]}"
			@information[:created_at] ||= Time.now

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
	end
end
