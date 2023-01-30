# www-dev
Repositorium for testing new ideas and designs for ML in PL websites

## Our resources

- Jakyll tutorial: https://jekyllrb.com/docs/step-by-step/01-setup/
- GitHub pages docs: https://docs.github.com/en/pages]


## Project structure

- _data - contains yml files with data
- _includes - contains different modules that can be included
- _layouts - contains full layouts for the page
- images - contains different images used on the site

## Quick-start - running this repo locally

### Install deps

#### Ubuntu:
First setup rbenv according to the official github page: https://github.com/rbenv/rbenv. 
Don't install the version provided in the distro's repo. Follow the official rbenv 
instructions to install the latest Ruby version and set it as the default interpreter.

Now you should be able to run `ruby` and `gem`:
```
$ ruby --version
ruby 3.0.2p107 (2021-07-07 revision 0db68f0233) [x86_64-linux-gnu]
$ gem
3.4.5
```

Now you can run the following in the project's root to install bundler (ruby's version of venv) and the correct gems.
```
gem install jekyll bundler
bundle install
```

#### Mac:
```
brew install chruby ruby-install xz
ruby-install ruby
echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.zshrc
echo "chruby ruby" >> ~/.zshrc
source ~/.zshrc # or restart your session
gem install jekyll bundler
```

Then:
```
bundle install
```

### Run server with livereload
```
bundle exec jekyll serve --livereload
```

