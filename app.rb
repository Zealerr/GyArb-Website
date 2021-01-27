require 'sinatra'
require 'slim'
require 'sqlite3'
require 'bcrypt'

enable :sessions


####Nästa grej
#fixa med profil-sida.
#fixa med home-sida.
#fixa med vidars pong spel.
#fixa CSS och javascript för sidor som behöver det.

#-----------------------------------------------------------------

#first page new users and users who have yet to log in will see
get ('/') do
  if session[:username] != nil #check if session of user exist.
    slim(:home)
  end
  slim(:start)
end

#log in page
get ('/login') do
  if session[:errormsg] != nil
    errormsg = session[:errormsg]
    session[:errormsg] = nil
    slim(:login, locals:{errormsg: errormsg})
  else
    errormsg = ""
    slim(:login, locals:{errormsg: errormsg})
  end
end

#sign up page
get ('/signup') do
  if session[:errormsg] != nil
    errormsg = session[:errormsg]
    session[:errormsg] = nil
    slim(:signup, locals:{errormsg: errormsg})
  else
    errormsg = ""
    slim(:signup, locals:{errormsg: errormsg})
  end
end

#home site for when logged in. Link to profile and the Game is here
get ('/home') do
  slim(:"users/home")
end

get ('/profile') do
  slim(:"users/profile")
end

#take username and password from user who is trying to log in and check
#with database if user exists as well as if the password is correct
post ('/users/login') do
  username = params[:username]
  password = params[:password]
  #check if a field is emptpy, if so redirect back
  if username == "" || password == ""
    session[:errormsg] = "One or more field is empty."
    redirect('/login')
  end
  db = SQLite3::Database.new('db/score.db')
  #check if username exists in database
  check = db.execute("SELECT EXISTS(SELECT * FROM users WHERE username=?)", username).first.first
  if check == 1
    db.results_as_hash = true
    result = db.execute("SELECT * FROM users WHERE username = ?", username).first
    db_pwdigest = result["pwdigest"]
    id = result["id"]
    if BCrypt::Password.new(db_pwdigest) == password #Check if password is right
      session[:id] = id
      session[:username] = username
      session[:pwdigest] = db_pwdigest
      redirect('/home')
    else #Password was wrong
      session[:errormsg] = "User does not exist or the password was wrong, please try again."
      redirect('/login')
    end
  else #User does not exist
    session[:errormsg] = "User does not exist or the password was wrong, please try again."
    redirect('/login')
  end
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