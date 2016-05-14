Given(/^I have an existing account$/) do
  User.create(name:"Test", password:"password")
end

When(/^I go to root path$/) do
  visit("/")
end

When(/^I click "([^"]*)"$/) do |name|
  click_link(name)
end

When(/^I fill in "([^"]*)" with "([^"]*)"$/) do |field, content|
  fill_in(field, with: content)
end

When(/^I click_button "([^"]*)"$/) do |name|
  click_button(name)
end

Then(/^I should see "([^"]*)"$/) do |text|
  assert page.has_content?(text)
end
