Given(/^I have an existing account$/) do
  User.create(name:"Test", password:"password")
end

Given(/^I have a User Logged In$/) do
  visit("/")
  click_link("Log In")
  fill_in('login_name', with: 'Test1')
  fill_in('login_password', with: 'password')
  click_button('Login')
end

When(/^I go to root path$/) do
  visit("/")
end

When /^I wait (\d+) seconds$/ do |seconds|
  sleep seconds.to_i
end

When(/^I click "([^"]*)"$/) do |name|
  click_link(name)
end

When(/^I click "([^"]*)" within "([^"]*)"$/) do |name, parent|
  within(parent){click_link(name)}
end

When(/^I select "([^"]*)" from "([^"]*)"$/) do |field, content|
  select(field, from: content)
end

When(/^I fill in "([^"]*)" with "([^"]*)"$/) do |field, content|
  fill_in(field, with: content)
end

When(/^I click_button "([^"]*)"$/) do |name|
  click_button(name)
end

When(/^I confirm by clicking "([^"]*)" within "([^"]*)"$/) do |name, parent|
  within(parent){find(name).click}
end

When(/^I play the card with "([^"]*)" ID$/) do |id|
  page.find(id).click
end

Then(/^I should see "([^"]*)"$/) do |text|
  assert page.has_content?(text)
end

Then(/^I should see the class "([^"]*)"$/) do |text|
  assert page.has_css?('text')
end

Then(/^I find "([^"]*)"$/) do |cls|
  assert page.has_css?(cls)
end
