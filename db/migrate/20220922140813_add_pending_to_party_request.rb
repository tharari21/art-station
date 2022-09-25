class AddPendingToPartyRequest < ActiveRecord::Migration[7.0]
  def change
    add_column :party_requests, :pending, :boolean
  end
end
