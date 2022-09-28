class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders, id: false, primary_key: :session_id do |t|
      t.string :session_id
      t.float :amount
      t.string :name

      t.timestamps
      
      t.index :session_id, unique: true
    end
  end
end
