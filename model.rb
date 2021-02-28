def connect_to_db()
  db = SQLite3::Database.new('db/score.db')
  db.results_as_hash = true
  return db
end

# user class
class User
  attr_reader :userId, :username
  def initialize(username, userId)
    @username = username
    @userId = userId
  end

  def stats()
    db = connect_to_db()
    return db.execute("SELECT * FROM pongWins WHERE userId=?", @userId)
  end

end

# user crud
def register_user(username, password, confirm_password)
  if password == confirm_password #Check if passwords match
    db = connect_to_db()
    # encrypt password
    password_digest = BCrypt::Password.create(password)
    # create new user in database
    db.execute('INSERT INTO users (username, pwdigest) VALUES (?,?)', username, password_digest)
    # get new users info
    user = db.execute("SELECT * FROM users WHERE username=?", username).first
    # create new stats connected to new user
    new_stats(user["id"])
    #Redirect to main
    redirect('/')
  else #Passwords do not match
    session[:errormsg] = "Passwords do not match!"
    redirect('/signup')
  end
end
def login_user(username, password)
  db = connect_to_db()
  #check if username exists in database
  check = db.execute("SELECT * FROM users WHERE username=?", username).first
  if check != nil
    result = db.execute("SELECT * FROM users WHERE username = ?", username).first
    db_pwdigest = result["pwdigest"]
    id = result["id"]
    if BCrypt::Password.new(db_pwdigest) == password #Check if password is right
      session[:user] = User.new(username, id)
      redirect('/')
    else #Password was wrong
      session[:errormsg] = "User does not exist or the password was wrong, please try again."
      redirect('/login')
    end
  else #User does not exist
    session[:errormsg] = "User does not exist or the password was wrong, please try again."
    redirect('/login')
  end
end

def new_stats(userId)
  db = connect_to_db()
  db.execute("INSERT INTO gameStats (games, wins, winstreak, userId) VALUES (0,0,0,?)", userId)
end
def get_stats()
  db = connect_to_db()
  stats = db.execute("SELECT games, wins, username FROM gameStats INNER JOIN users ON users.id = gameStats.userId")
  return stats
end
def get_user_stats(user_id)
  db = connect_to_db
  userStats = db.execute("SELECT username, games, wins, FROM users INNER JOIN gameStats ON gameStats.userId = ?", user_id)
  p userStats
end


p "model.rb loaded"