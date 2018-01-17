require 'sinatra/base'

module Chino
	class Website < Sinatra::Base

		def self.setup(config)
			@@config = config
		end

		set :bind, '0.0.0.0'

		helpers do
			def output_for(path)
				file = @@config.get_file(path)
				if file[:filename]
					send_file file[:filename]
				elsif file[:string]
					file[:string]
				else
					status 404
				end
			end
		end

		get '/' do
			output_for("index-debug.html")
		end

		get '/*' do
			output_for(params["splat"].first)
		end
	end
end