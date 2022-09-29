class AddTagToPainting < ActiveRecord::Migration[7.0]
  def change
    add_column :paintings, :tags, :text, array: true, default: []
  end
end
