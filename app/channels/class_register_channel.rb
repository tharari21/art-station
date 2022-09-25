class ClassRegisterChannel < ApplicationCable::Channel
  def subscribed
    stream_from "class_registrations"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
