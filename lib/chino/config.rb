require 'erb'

module Chino
	class Config

		def initialize(file: "Chinofile", install: false)
			@chinofile = Chinofile.new(install: install) do 
				proc = Proc.new {}
				eval File.read(file), proc.binding, file
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

		def dependencies
			@chinofile.information[:dependencies]
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
			elsif @chinofile.find_file(file)
				{
					filename: "#{@chinofile.find_file(file)}"
				}
			else
				{}
			end
		end

		def collect_exports
			exports = @chinofile.collect_exports
		end
	end
end
