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
    db = connect_to_db
    stats = db.execute("SELECT games, wins, winStreak, winPercentage FROM gameStats WHERE userId=?", @userId).first
    return stats
  end

  def add_game(matchIsWin)
    db = connect_to_db
    if matchIsWin
      db.execute("UPDATE gameStats SET games = games +1,wins = (wins + 1), winStreak = winStreak + 1 WHERE userId=?", @userId)
    else
      db.execute("UPDATE gameStats SET games = games +1, winStreak = 0 WHERE userId=?", @userId)
    end
    userStats = stats()
    games = userStats["games"]
    wins = userStats["wins"]
    if games != 0 #if games played then we can not divide games
      winPercentage = (wins.to_f / games.to_f * 100).round
    else
      winPercentage = 0
    end
    # update winPercentage
    db.execute("UPDATE gameStats SET winPercentage = ? WHERE userId=?", winPercentage, @userId)
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
  db.execute("INSERT INTO gameStats (games, wins, winstreak, winPercentage, userId) VALUES (0,0,0,0,?)", userId)
end
def get_stats()
  db = connect_to_db()
  stats = db.execute("SELECT games, wins, winStreak, winPercentage, username FROM gameStats INNER JOIN users ON users.id = gameStats.userId")
  return stats
end
def get_leaderboard()
  db = connect_to_db()
  stats = db.execute("SELECT wins, winPercentage, username FROM gameStats INNER JOIN users ON users.id = gameStats.userId ORDER BY wins DESC, winPercentage DESC")
end

puts "model.rb loaded"