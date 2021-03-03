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
  if session[:user] == nil #check if session of user exist.
    redirect('/login')
  end
end

def get_errormsg()
  if session[:errormsg] != nil # if there is a errormsg
    errormsg = session[:errormsg] # set locals variable to content of errormsg
    session[:errormsg] = nil  # reset session
  else  
    errormsg = nil # if no session of errormsg exist, reset local variable 
  end
  return errormsg
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
  slim(:home)
end

# game page
get ('/game') do
  for_user()
  slim(:game)
end

post ('/game') do
  result = params[:result]
  if result == "player"
    session[:user].add_game(true)
    session[:opponent].add_game(false)
    session[:lastGame] = "You won vs #{session[:opponent].username}."
  else
    session[:user].add_game(false)
    session[:opponent].add_game(true)
    session[:lastGame] = "You lost vs #{session[:opponent].username}."
  end
  redirect('/game')
end

#log in page
get ('/login') do
  errormsg = get_errormsg()
  slim(:login, locals:{errormsg: errormsg})
end

#sign up page
get ('/signup') do
  errormsg = get_errormsg()
  slim(:signup, locals:{errormsg: errormsg})
end

#restores logged session to nil and redirects to homepage
get ('/logout') do
  session[:user]
  redirect('/')
end

#account info site
get ('/users/account') do
  for_user
  slim(:"users/account")
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