class ChangePendingToStatus < ActiveRecord::Migration[7.0]
  def change
    rename_column :party_requests, :pending, :status
    change_column :party_requests, :status, :integer, using: 'status::integer'
  end
end
