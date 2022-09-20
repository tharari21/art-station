class PaintingClassRegistration < ApplicationRecord
    belongs_to :user, optional: true
    belongs_to :painting_class
    

end
