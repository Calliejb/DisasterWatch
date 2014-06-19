require 'spec_helper'

describe Disaster do
	it { should belong_to(:country) }
end