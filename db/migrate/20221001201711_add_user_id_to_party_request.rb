class AddUserIdToPartyRequest < ActiveRecord::Migration[7.0]
  def change
    add_column :party_requests, :user_id, :integer
  end
end
