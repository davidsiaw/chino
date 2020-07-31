# frozen_string_literal: true

require 'spec_helper'

RSpec.describe Chinofile do
  it 'has dependency syntax' do
    cf = Chinofile.new do
      imports item: 'meow'
    end

    expect(cf.information[:dependencies].first).to eq(driver: 'item', version: nil, location: 'meow')
  end

  it 'has dependency syntax with version' do
    cf = Chinofile.new do
      imports path: '/meow', version: '1.0.0'
    end

    expect(cf.information[:dependencies].first).to eq(driver: 'path', version: '1.0.0', location: '/meow')
  end

  it 'can have multiple dependencies' do
    cf = Chinofile.new do
      imports path: '/meow'
      imports path: '/woof', version: '2.0.0'
    end

    expect(cf.information[:dependencies][0]).to eq(driver: 'path', version: nil, location: '/meow')
    expect(cf.information[:dependencies][1]).to eq(driver: 'path', version: '2.0.0', location: '/woof')
  end
end
