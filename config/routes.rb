Routing::Application.routes.draw do
  resources :categories
  resources :trips
 # post 'trips/save_markers'
  match "/trips/save_markers" => "trips#save_markers"
  match "/explore" => "explore#index"
end
