# Chino

Chino is a commandline tool that allows you to develop Cappuccino apps on the fly and provides a small webserver to preview your site as it changes.

## Installation

    $ gem install chino

## Usage

Create a chino project by going

    $ chino create my_app
    $ cd my_app

Create boilerplate Cappuccino .j files using `chino gen`

    $ bundle exec chino gen class MyNewObject.j

Preview your app using

    $ bundle exec chino
    
Build your app using

    $ bundle exec chino build
    
The resulting files can be moved to any CDN or file-based webserver for serving.

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/davidsiaw/chino. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

