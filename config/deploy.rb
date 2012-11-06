# Load RVM's capistrano plugin.    
require "rvm/capistrano"
require "bundler/capistrano"

#set :rvm_ruby_string, '1.9.3'
#set :rvm_type, :system 

load 'deploy/assets'

set :application, "blog"
set :repository, "git@github.com:Henkiebob/bennoe_dev_1.git"

set :scm, 'git'

set :user, 'deploy'
set :branch, "master"

set :use_sudo, false
set :deploy_to, "/home/deploy/rails_apps/#{application}"
set :deloy_via, :remote_cache

#Voor symlink
# config/deploy.rb
#set :shared_children, shared_children + %w{public/uploads}

default_run_options[:shell] = false #No more  shell
set :rails_env, "production"
set :migrate_target, :latest

role :web, "37.34.59.60" # Your HTTP server, Apache/etc
role :app, "37.34.59.60" # This may be the same as your `Web` server
role :db, "37.34.59.60", :primary => true # This is where Rails migrations will run

namespace :deploy do
 task :start do ; end
 task :stop do ; end
 task :restart, :roles => :app, :except => { :no_release => true } do
   run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
 end

 desc "Recreate symlink"
 task :resymlink, :roles => :app do
   run "rm -f #{current_path} && ln -s #{release_path} #{current_path}"
 end


 # Maakt uploads public als een symlink	
# task :symlink_uploads do
#   run "ln -nfs #{shared_path}/uploads  #{release_path}/public/uploads"
# end
end
