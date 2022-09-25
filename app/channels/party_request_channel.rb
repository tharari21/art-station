class PartyRequestChannel < ApplicationCable::Channel
  def subscribed
    stream_from "party_requests"
  end
  # def receive(data)
  #   puts "PARTY REQUEST DATA"
  #   puts data['date']
  #   party_request = PartyRequest.create!(date: data['date'], name: data['name'], email: data['email'], phone_number: data['phone_number'])
  #   party_request.update(pending: true)
  #   PartyRequestChannel.broadcast_to("party_requests", party_request)
  # end
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    puts "Unsubscribing from channel"
  end
end
