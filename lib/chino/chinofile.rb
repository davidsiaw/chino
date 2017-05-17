
module Chino
	class Chinofile

		attr_accessor :information

		def initialize(path: "#{`pwd`.chomp}", &block)
			@information = {
				path: path,
				dependencies: {},
				exports: {}
			}
			instance_eval(&block)

			@information[:name] ||= "UnnamedChinoProject"
			@information[:version] ||= "0.1.0"
			@information[:author] ||= "Incognito"
			@information[:author_email] ||= "incognito@example.com"
			@information[:company_name] ||= "#{@information[:author]}"
			@information[:identifier] ||= "com.#{@information[:company_name].downcase.gsub(/[^a-z0-9]+/, "_")}.#{@information[:name].downcase.gsub(/[^a-z0-9]+/, "_")}"
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

		def exports(filename)
			@information[:exports][filename] = File.join(@information[:path], filename)
		end

		def imports(the_name, path:nil)

			file = File.join(path, "Chinofile")
			dep_chinofile = Chinofile.new(path: path) do 
				proc = Proc.new {}
				eval File.read(file), proc.binding, file
			end

			if the_name != dep_chinofile.information[:name]
				throw "Name of the bundle specified is not the same as the one in #{path}"
			end

			@information[:dependencies][the_name] = dep_chinofile
		end

		def find_file(filename)
			return @information[:exports][filename] if @information[:exports][filename]

			@information[:dependencies].map{|k,v| v.find_file(filename)}.select{|x| x}.first
		end

		def collect_exports
			all = {}
			@information[:dependencies].each {|k,chinofile| chinofile.collect_exports.each {|k,v| all[k] = v } }
			@information[:exports].each { |k,v| all[k] = v }
			return all
		end
	end
end
