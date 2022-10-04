Rails.application.routes.draw do
  get 'submissions/index'
  get 'submissions/new'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # login and signup
  get '/updates', to: 'updates#index'
  post '/updates', to: 'updates#create'

  post '/login', to: 'auth#create'
  delete '/logout', to: 'auth#destroy'
  post '/register', to: 'users#create'
  get '/logged_in', to: 'auth#show'
  get '/users/:id/orders', to: 'users#orders'
  get '/users/:id/painting_classes', to: 'users#upcoming_classes'
  get '/users/:id/party_requests', to: 'users#upcoming_party_requests'
  patch '/users/:id', to: 'users#update'
  
  post '/webhooks', to: 'webhooks#create'

  get '/classes', to: 'painting_classes#index'
  post '/classes', to: 'painting_classes#create'
  get '/classes/upcoming', to: 'painting_classes#upcoming'
  get '/classes/:id', to: 'painting_classes#show'
  # here is where we should implement nested routes
  get '/classes/:id/currently_occupied', to: 'painting_classes#currently_occupied'
  get '/classes/:id/registered', to: 'painting_classes#registered'
  post '/classes/:id/register', to: 'painting_class_registrations#create'

  get '/paintings', to: 'paintings#index'
  post '/paintings', to: 'paintings#create'

  get '/party_requests/pending', to: 'party_requests#pending'
  get '/party_requests', to: 'party_requests#index'
  post '/party_requests', to: 'party_requests#create'
  patch '/party_requests/:id', to: 'party_requests#update'
  delete '/party_requests/:id', to: 'party_requests#destroy'
  mount ActionCable.server => "/cable"

end
