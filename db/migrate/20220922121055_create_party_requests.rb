class CreatePartyRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :party_requests do |t|
      t.datetime :date
      t.string :name
      t.string :email
      t.string :phone_number

      t.timestamps
    end
  end
end
