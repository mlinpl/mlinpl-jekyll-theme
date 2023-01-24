# www-dev

## Our resources

- Jakyll tutorial: https://jekyllrb.com/docs/step-by-step/01-setup/
- GitHub pages docs: https://docs.github.com/en/pages]


## Project structure

- _data - contains yml files with data
- _includes - contains different modules that can be included
- _layouts - contains full layouts for the page
- images - contains different images used on the site



## Quick-start - running this repo localy

### Install deps

On Ubuntu:
```
sudo apt install ruby-full build-essential zlib1g-dev
sudo gem install jekyll bundler
```

On Mac:
```
brew install chruby ruby-install xz
ruby-install ruby
echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.zshrc
echo "chruby ruby" >> ~/.zshrc
source ~/.zshrc # or restart your session
gem install jekyll bundler
```

### Installing other deps
```
bundle install
```

### Run server
```
jekyll serve
```

