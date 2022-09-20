# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

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
p1.image.attach(io: File.open('db/seed_images/flowers.jpg'), filename: 'file.jpg')

PaintingClass.create!(date: DateTime.now+1.hours, max_capacity: 20, price: 30, painting: p1)
PaintingClass.create!(date: DateTime.now+25.hours, max_capacity: 20, price: 30, painting: p1)
PaintingClass.create!(date: DateTime.now+49.hours, max_capacity: 20, price: 30, painting: p1)
PaintingClass.create!(date: DateTime.now+73.hours, max_capacity: 20, price: 30, painting: p1)
PaintingClass.create!(date: DateTime.now+97, max_capacity: 20, price: 30, painting: p1)
PaintingClass.create!(date: DateTime.now+121, max_capacity: 20, price: 30, painting: p1)