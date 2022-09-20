Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # login and signup
  post '/login', to: 'auth#create'
  post '/register', to: 'users#create'

  get '/classes', to: 'painting_classes#index'
  get '/classes/upcoming', to: 'painting_classes#upcoming'
end
