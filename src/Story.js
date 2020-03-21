import React from 'react';
import {
  HeaderWrapper,
  RankContainer,
  Title,
  SourceContainer,
  SourceLink,
  FooterWrapper, 
  FooterLink,
} from "./Styles";

class StoryList extends React.Component {
  render() {
    const stories = this.props.stories.map((story, i) => {
      return <Story index={i+1} key={i} story={story} />
    });

    return (
      <div style={{margin: "20px"}}>
        {stories}
      </div>
    );
  }
}

class Story extends React.Component {
    render() {
      const story = this.props.story;

      return (
      <div className="story">
        <Header 
          index={this.props.index}
          title={story.title}
          url={story.url}
        />
        <Footer
          score={story.points}
          author={story.author}
          timestamp={story.created_at_i}
        />
      </div>
      );
    }
}

class Header extends React.Component {
  render() {
    const url = this.props.url || "";
    const urlShort = url.length > 48 ? url.substr(0, 48) + "..." : url;

    return (
      <HeaderWrapper>
        <RankContainer>
          {this.props.index}
        </RankContainer>
        <Title>
          {this.props.title}
        </Title>
        <SourceContainer>
          (<SourceLink href={url}>{urlShort}</SourceLink>)
        </SourceContainer>
      </HeaderWrapper>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <FooterWrapper>
        {this.props.score} point(s) by 
        <FooterLink>{this.props.author}</FooterLink>
         | 
        <FooterLink>{new Date(this.props.timestamp * 1000).toDateString()}</FooterLink>
      </FooterWrapper>
    );
  }
}


export default StoryList;