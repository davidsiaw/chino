# frozen_string_literal: true

require 'spec_helper'

RSpec.describe Config do
  let(:chinofile) { '' }

  before do
    allow(File).to receive(:read).with('Chinofile') { chinofile }
  end

  it 'can be empty' do
    c = Config.new

    expect(c.bundle_company_name).to eq 'Incognito'
  end


  it 'if not given a chinofile, there are no exports' do
    c = Config.new

    expect(c.bundle_exports).to eq({})
  end

  it 'if given a chinofile, all exports are prefixed that way' do
    allow(File).to receive(:read).with('/abc/something') { 'exports "hello.j"' }
    c = Config.new(file: '/abc/something')

    expect(c.bundle_exports).to eq('hello.j' => 'abc/hello.j')
  end

  describe '#get_file' do
    it 'returns nothing by default' do
      expect(Config.new.get_file('akfakslfaskfghasgjlkhawoih')).to eq({})
    end

    it 'returns exact path' do
      allow(File).to receive(:exist?).with('woof.j') { true }

      expect(Config.new.get_file('woof.j')).to eq(filename: 'woof.j')
    end

    it 'returns erb if it exists' do
      c = Config.new
      allow(File).to receive(:exist?).with('woof.j') { false }
      allow(File).to receive(:exist?).with('/stuff/woof.j.erb') { true }
      allow(c).to receive(:erb_name).with('woof.j') { '/stuff/woof.j.erb' }
      allow(c).to receive(:erb).with('woof.j') { { string: 'LOL' } }

      expect(c.get_file('woof.j')).to eq(string: 'LOL')
    end

    it 'returns common path file if it exists' do
      c = Config.new
      allow(File).to receive(:exist?).with('woof.j') { false }
      allow(File).to receive(:exist?).with('/stuff/common/woof.j.erb') { false }
      allow(File).to receive(:exist?).with('/stuff/common/woof.j') { true }
      allow(c).to receive(:common_path) { '/stuff/common' }

      expect(c.get_file('woof.j')).to eq(filename: '/stuff/common/woof.j')
    end

    it 'returns dependency file if it exists' do
      c = Config.new
      allow(File).to receive(:exist?).with('Woof/woof.j') { false }
      allow(File).to receive(:exist?).with('/stuff/common/Woof/woof.j.erb') { false }
      allow(File).to receive(:exist?).with('/stuff/common/Woof/woof.j') { false }
      allow(c).to receive(:common_path) { '/stuff/common' }

      allow(c).to receive(:dependency_has_file?).with('Woof/woof.j') { true }
      allow(c).to receive(:get_from_dependency).with('Woof/woof.j') { { filename: 'Woof/woof.j' } }

      expect(c.get_file('Woof/woof.j')).to eq(filename: 'Woof/woof.j')
    end
  end
end
