class Order < ApplicationRecord
    belongs_to :user
    self.primary_key = :session_id
end
