require 'sinatra'
require 'slim'
require 'sqlite3'
require 'bcrypt'
require_relative './model.rb'
enable :sessions

def test_user()
  user = User.new("Admin", 99)
  session[:user] = user
end

def for_user()
  if session[:username] != nil #check if session of user exist.
    redirect('/')
  end
end
####Nästa grej
#fixa login session.
#fixa med profil-sida.
#fixa med home-sida.
#fixa med vidars pong spel.
#fixa CSS och javascript för sidor som behöver det.

#-----------------------------------------------------------------

#first page new users and users who have yet to log in will see
get ('/') do
  test_user()
  slim(:home)
end

get ('/game') do
  test_user()
  for_user()
  slim(:game)
end

#log in page
get ('/login') do
  slim(:login)
end

#sign up page
get ('/signup') do
  slim(:signup)
end

#restores logged session to nil and redirects to homepage
get ('/logout') do
  session[:user]
  redirect('/')
end

#account info site
get ('/user/account') do
  for_user
  slim(:"users/account")
end

get ('/user/stats') do
  for_user
  slim(:"users/stats")
end

#take username and password from user who is trying to log in and check
#with database if user exists as well as if the password is correct
post ('/users/login') do
  username = params[:username]
  password = params[:password]
  login_user(username, password)
  redirect('/')
end

post ('/users/signup') do
  username = params[:username]
  password = params[:password]
  confirm_password = params[:confirm_password]
  register_user(username, password, confirm_password)
  redirect('/')
end

#Add user if everything is right. Add both new user and new pongWins score in database.
post ('/users/signup') do
  username = params[:username]
  password = params[:password]
  confirm_password = params[:confirm_password]
  #check if anything is wrong with username or passwords such that 
  if username.length < 4
    session[:errormsg] = "Username must be more than 3 characters."
    redirect('/signup')
  elsif password.length < 8
    session[:errormsg] = "Password must be at least 8 characters long."
    redirect('/signup')
  elsif username == "" && password == ""
    session[:errormsg] = "Username and password cannot be blank"
    redirect('/signup')
  end
  if password == confirm_password #Check if passwords match
    #lägg till användare
    password_digest = BCrypt::Password.create(password)
    db = SQLite3::Database.new('db/score.db')
    db.execute('INSERT INTO users (username, pwdigest) VALUES (?,?)', username, password_digest)
    #lägg till pongWins med referens till användare.
    user = db.execute("SELECT * FROM users WHERE username=?", username)
    userId = user["id"]
    db.execute("INSERT INTO pongWins (wins, winStreak, userId) VALUES (?,?,?)", 0,0,userId)
    #Redirect to main
    redirect('/')
  else #Passwords do not match
    session[:errormsg] = "Passwords do not match!"
    redirect('/signup')
  end
end