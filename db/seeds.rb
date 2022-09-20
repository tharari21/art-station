# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create!(email:'tharari21@gmail.com' , username: 'tomer', password: 'tomer', admin: true)
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: Faker::Internet.unique.password)
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: Faker::Internet.unique.password)
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: Faker::Internet.unique.password)
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: Faker::Internet.unique.password)
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: Faker::Internet.unique.password)
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: Faker::Internet.unique.password)
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: Faker::Internet.unique.password)
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: Faker::Internet.unique.password)
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: Faker::Internet.unique.password)
User.create!(email:Faker::Internet.unique.email , username: Faker::Internet.unique.username, password: Faker::Internet.unique.password)

p1 = Painting.create!(name: "sunset")
p2 = Painting.create!(name: "rainbow")
p3 = Painting.create!(name: "pony")
p4 = Painting.create!(name: "docks")
p5 = Painting.create!(name: "ducks")
p1.image.attach(io: File.open('db/seed_images/flowers.jpg'), filename: 'file.jpg')
p2.image.attach(io: File.open('db/seed_images/flowers.jpg'), filename: 'file.jpg')
p3.image.attach(io: File.open('db/seed_images/flowers.jpg'), filename: 'file.jpg')
p4.image.attach(io: File.open('db/seed_images/flowers.jpg'), filename: 'file.jpg')
p5.image.attach(io: File.open('db/seed_images/flowers.jpg'), filename: 'file.jpg')

PaintingClass.create!(date: DateTime.now+1.hours, max_capacity: 20, price: 30, painting: p1)
PaintingClass.create!(date: DateTime.now+25.hours, max_capacity: 20, price: 30, painting: p2)
PaintingClass.create!(date: DateTime.now+49.hours, max_capacity: 20, price: 30, painting: p3)
PaintingClass.create!(date: DateTime.now+73.hours, max_capacity: 20, price: 30, painting: p4)
PaintingClass.create!(date: DateTime.now+97, max_capacity: 20, price: 30, painting: p5)
PaintingClass.create!(date: DateTime.now+121, max_capacity: 20, price: 30, painting: p2)