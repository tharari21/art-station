module DateValidator
    def is_valid_time?
        errors.add(:date, "must be during reasonable hours") unless self.date.hour > 7 && self.date.hour < 23
    end
    def is_future?
        errors.add(:date, "must be in the future") unless self.date.future?
    end
end