# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create!(email:'tharari93@gmail.com' , username: 'tomer', first_name: "Tomer", last_name: "Harari", phone_number: "9179745453",password: 'tomer', admin: true)
User.create!(email:'tharari21@gmail.com' , first_name: "Tomer", last_name: "Harari", phone_number: "9179745453",username: 'user', password: 'password')
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: 'password')
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: 'password')
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: 'password')
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: 'password')
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: 'password')
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: 'password')
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: 'password')
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: 'password')
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: 'password')
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: 'password')

p1 = Painting.create!(name: "flowers", tags: ["nature", "flowers"])
p2 = Painting.create!(name: "dolphins", tags: ["nature", "animals", "ocean", "waves"])
p3 = Painting.create!(name: "trees", tags: ["nature", "trees"])

p1.image.attach(io: File.open('db/seed_images/flowers.jpg'), filename: 'flowers.jpg')
p2.image.attach(io: File.open('db/seed_images/dolphins.jpg'), filename: 'dolphin.jpg')
p3.image.attach(io: File.open('db/seed_images/trees.png'), filename: 'trees.png')

PaintingClass.create!(date: DateTime.now+24.hours, max_capacity: 20, price: 30, painting: p1)
PaintingClass.create!(date: DateTime.now+48.hours, max_capacity: 20, price: 30, painting: p2)
PaintingClass.create!(date: DateTime.now+72.hours, max_capacity: 20, price: 30, painting: p3)
PaintingClass.create!(date: DateTime.now+96.hours, max_capacity: 20, price: 30, painting: p1)
PaintingClass.create!(date: DateTime.now+120.hours, max_capacity: 20, price: 30, painting: p2)
PaintingClass.create!(date: DateTime.now+144.hours, max_capacity: 20, price: 30, painting: p3)
PaintingClass.create!(date: DateTime.now+168.hours, max_capacity: 20, price: 30, painting: p1)
PaintingClass.create!(date: DateTime.now+2.weeks, max_capacity: 20, price: 30, painting: p2)
PaintingClass.create!(date: DateTime.now+2.weeks-4.hours, max_capacity: 20, price: 30, painting: p3)
PaintingClass.create!(date: DateTime.now+2.weeks+1.day, max_capacity: 20, price: 30, painting: p1)
PaintingClass.create!(date: DateTime.now+2.weeks+1.day-3.hours, max_capacity: 20, price: 30, painting: p2)
PaintingClass.create!(date: DateTime.now+2.weeks+2.days, max_capacity: 20, price: 30, painting: p3)
