class AddNumberOfParticipantsPackageToPartyRequest < ActiveRecord::Migration[7.0]
  def change
    add_column :party_requests, :number_of_participants, :integer, null: true
    add_column :party_requests, :package, :integer
  end
end
