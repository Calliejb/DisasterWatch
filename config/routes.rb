DisasterWatch::Application.routes.draw do
  devise_for :users
  resources :organizations
  resources :updates
  resources :disasters
  resources :users
  resources :countries

  get "/welcome" => "welcome#index"
  get "/countrymapjson" => "disasters#countrymap"
  get "/aidsjson" => "disasters#aids"
  get "/countryjson" => "disasters#countries"
  get "/countrydisasterjson" => "disasters#countrydisasters"
  get "/disasterdescriptionsjson" => "disasters#disasterdescriptions"
  
  get "/africanews" => "updates#show_africa"
  get "/asianews" => "updates#show_asia"
  get "/middleeastnews" => "updates#show_middle_east"
  get "/northamericanews" => "updates#show_north_america"
  get "/centralamericanews" => "updates#show_central_america"
  get "/southamericanews" => "updates#show_south_america"
  get "/oceanianews" => "updates#show_oceania"
  get "/europenews" => "updates#show_europe"

  root 'welcome#index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
