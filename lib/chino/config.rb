require 'erb'

module Chino
	class Config

		def initialize(&block)
			@chinofile = Chinofile.new(&block)
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

		def data_path
			"#{Gem.loaded_specs['chino'].full_gem_path}/data/chino"
		end

		def common_path
			"#{data_path}/common"
		end

		def get_file(file)
			if File.exists?("#{file}")
				{
					filename: "#{file}"
				}
			elsif File.exists?("#{common_path}/#{file}.erb")
				renderer = ERB.new(File.read("#{common_path}/#{file}.erb"))
				{
					string: renderer.result(binding)
				}
			elsif File.exists?("#{common_path}/#{file}")
				{
					filename: "#{common_path}/#{file}"
				}
			else
				{}
			end
		end
	end
end