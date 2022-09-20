Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # login and signup
  get '/updates/latest', to: 'updates#latest'

  post '/login', to: 'auth#create'
  post '/register', to: 'users#create'

  get '/classes', to: 'painting_classes#index'
  get '/classes/upcoming', to: 'painting_classes#upcoming'
  # here is where we should implement nested routes
  get '/classes/:id/currently_occupied', to: 'painting_classes#currently_occupied'
  post '/classes/:id/register', to: 'painting_class_registrations#create'

  

end
