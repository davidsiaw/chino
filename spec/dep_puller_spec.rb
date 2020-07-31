# frozen_string_literal: true

require 'spec_helper'

RSpec.describe DepPuller do
  describe '#dependency' do
    it 'returns a dependency that contains nothing by default' do
      dp = DepPuller.new
      expect(dp.dependency('a/thing').exist?('a/thing')).to eq false
    end

    it 'returns a dependency that was loaded' do
      mock_driver_class = Class.new(Drivers::BaseDriver)
      mock_dep = double(mock_driver_class)

      stub_const('Chino::Drivers::MockDriver', mock_driver_class)

      dp = DepPuller.new

      allow(mock_driver_class).to receive(:new) { mock_dep }
      allow(mock_dep).to receive(:name) { 'Abc' }
      allow(mock_dep).to receive(:version) { '0.0.1' }
      allow(mock_dep).to receive(:inner_deps) { [] }

      dp.load_dependency!(driver: 'mock', location: 'something')

      expect(dp.dependency('Abc/thing')).to eq mock_dep
    end
  end

  describe '#name_for_dependency' do
    it 'returns the part before the slash' do
      dp = DepPuller.new
      expect(dp.name_for_dependency('NorthPole/Santa.j')).to eq 'NorthPole'
    end
  end

  describe 'load_dependency!' do
    it 'errors if no such driver' do
      dp = DepPuller.new
      expect { dp.load_dependency!(driver: 'nonsense', location: 'nothing') }.to raise_error "No such driver 'nonsense'"
    end

    context 'given a mock driver' do
      let(:mock_driver_class) { Class.new(Drivers::BaseDriver) }
      let(:mock_driver) { double(mock_driver_class) }
      before do
        stub_const('Chino::Drivers::MockDriver', mock_driver_class)
      end

      it 'loads the appropriate driver' do
        dp = DepPuller.new

        expect(mock_driver_class).to receive(:new) { mock_driver }
        expect(mock_driver).to receive(:name) { 'Abc' }
        expect(mock_driver).to receive(:version) { '0.0.1' }
        expect(mock_driver).to receive(:inner_deps) { [] }

        dp.load_dependency!(driver: 'mock', location: 'something')
      end

      it 'loads the inner deps once if it includes itself' do
        dp = DepPuller.new

        expect(mock_driver_class).to receive(:new) { mock_driver }.twice
        expect(mock_driver).to receive(:name) { 'Abc' }.twice
        expect(mock_driver).to receive(:version) { '0.0.1' }.twice
        expect(mock_driver).to receive(:inner_deps) { [{ driver: 'mock', location: 'aaa' }] }

        dp.load_dependency!(driver: 'mock', location: 'something')
      end

      it 'loads the inner deps once if it includes itself several times' do
        dp = DepPuller.new

        expect(mock_driver_class).to receive(:new) { mock_driver }.exactly(4).times
        expect(mock_driver).to receive(:name) { 'Abc' }.exactly(4).times
        expect(mock_driver).to receive(:version) { '0.0.1' }.exactly(4).times
        expect(mock_driver).to receive(:inner_deps) { [
          { driver: 'mock', location: 'aaa' },
          { driver: 'mock', location: 'aaa' },
          { driver: 'mock', location: 'aaa' }
        ] }

        dp.load_dependency!(driver: 'mock', location: 'something')
      end

      context 'given another mock' do
        let(:second_dep) { double(mock_driver_class) }

        it 'loads the inner dependency' do
          dp = DepPuller.new

          expect(mock_driver_class).to receive(:new).with(driver: 'mock', location: 'second') { second_dep }
          expect(second_dep).to receive(:name) { 'Second' }
          expect(second_dep).to receive(:version) { '0.0.1' }
          expect(second_dep).to receive(:inner_deps) { [] }

          expect(mock_driver_class).to receive(:new) { mock_driver }
          expect(mock_driver).to receive(:name) { 'Abc' }
          expect(mock_driver).to receive(:version) { '0.0.1' }
          expect(mock_driver).to receive(:inner_deps) { [{ driver: 'mock', location: 'second' }] }

          dp.load_dependency!(driver: 'mock', location: 'something')
        end

        it 'handles circular dependency' do
          dp = DepPuller.new

          expect(mock_driver_class).to receive(:new).with(driver: 'mock', location: 'second') { second_dep }
          expect(second_dep).to receive(:name) { 'Second' }
          expect(second_dep).to receive(:version) { '0.0.1' }
          expect(second_dep).to receive(:inner_deps) { [{ driver: 'mock', location: 'something' }] }

          expect(mock_driver_class).to receive(:new) { mock_driver }.twice
          expect(mock_driver).to receive(:name) { 'Abc' }.twice
          expect(mock_driver).to receive(:version) { '0.0.1' }.twice
          expect(mock_driver).to receive(:inner_deps) { [{ driver: 'mock', location: 'second' }] }

          dp.load_dependency!(driver: 'mock', location: 'something')
        end
      end
    end
  end

  describe '#get_from_dependency' do
    it 'returns nothing by default' do
      dp = DepPuller.new

      expect(dp.get_from_dependency('something')).to eq({})
    end

    it 'returns value given by dependency' do
      dp = DepPuller.new
      dep = instance_double(Drivers::BaseDriver)
      allow(dp).to receive(:dependency).with('aaaa') { dep }
      allow(dep).to receive(:load_file) { { filename: 'haha' } }

      expect(dp.get_from_dependency('aaaa')).to eq({ filename: 'haha' })
    end
  end

  describe '#dependency_has_file?' do
    it 'returns false by default' do
      dp = DepPuller.new

      expect(dp.dependency_has_file?('something')).to eq false
    end

    it 'returns value given by dependency' do
      dp = DepPuller.new
      dep = instance_double(Drivers::BaseDriver)
      allow(dp).to receive(:dependency).with('abcde') { dep }
      allow(dep).to receive(:exist?) { true }

      expect(dp.dependency_has_file?('abcde')).to eq true
    end
  end
end
