import React from 'react'
import { graphql, Link, navigate } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Graph } from 'react-d3-graph'
import Layout from '../layout/layout'
import '../styles/note.css'
import '../styles/graph.css'
const makeSlug = require('../utils/make-slug')

export default function Note({ pageContext, data }) {
  const post = data.mdx

  // Create the data for the graph visualisation for the note linking.
  const graphData = {
    nodes: [{ id: post.fields.title, color: 'black' }],
    links: [],
    focusedNodeId: post.fields.title,
  }

  // Links to the current Note - Disabled for Martin
  // for (let i = 0; i < pageContext.referredBy.length; i++) {
  //   const refNoteTitle = pageContext.referredBy[i].title
  //   graphData.nodes.push({ id: refNoteTitle })
  //   graphData.links.push({ source: refNoteTitle, target: post.fields.title })
  // }

  // Links from the current Note
  for (let i = 0; i < pageContext.refersTo.length; i++) {
    const refNoteTitle = pageContext.refersTo[i]
    graphData.nodes.push({ id: refNoteTitle })
    graphData.links.push({ source: post.fields.title, target: refNoteTitle })
  }

  // If this is an orphan note(no links to and from other notes), we need some hackery to get it to work.
  if (graphData.nodes.length === 1) {
    graphData.nodes.push({ id: 'No Links', color: '#eee', fontColor: '#999' })
    graphData.links.push({
      source: post.fields.title,
      target: 'No Links',
      color: '#eee',
    })
  }

  const onClickNode = function (nodeId) {
    if (nodeId === 'Unlinked') return
    const slug = makeSlug(nodeId)
    navigate(`/${slug}`)
  }

  // the graph configuration, just override the ones you need
  const graphConfig = {
    automaticRearrangeAfterDropNode: false,
    directed: true,
    initialZoom: 1.4,
    // nodeHighlightBehavior: true,
    node: {
      color: 'gray',
      size: 120,
      fontSize: 10,
    },
  }

  return (
    <Layout title={post.fields.title} type="note">
      
      <div className="column is-five-fifths note-page-section " style={{paddingLeft:'3em'}}>
        <main className="columns" >
          <div className="column is-one-fifth" style={{fontColor:'#54595F', backgroundColor:'#fafcff', fontSize:'14px'}}>
            <ul className="nav-list" >
  
              <p><h5>Business review</h5></p>
              <li><Link to='/how-is-your-business-doing'>❓ How is your business doing?</Link></li> 
              <li><Link to='/how-is-your-money-game'>❓How is your Money Game?</Link></li> 
              <li><Link to='/any-deals-in-your-pipeline'>❓Any deals in your pipeline?</Link></li> 
              <p><h5>Workflows</h5></p>        
              <li><Link to='/tags/workflows'>📁 All Workflows</Link></li> 
              <li><Link to='/start-salesflow-coach'>▶️ Start the programme</Link></li>
              <li><Link to='/pick-a-lead-and-review-where-that-deal-is-at'>🔎 Pipeline review</Link></li>
              <li><Link to='/myno-mine-your-network-for-opportunities'>⛏️ Mine your network for opportunities</Link></li>
              <li><Link to='/how-to-clean-up-deadwood'>🪓 Cull & clean up your pipeline</Link></li>
            </ul>
          </div>
        
        <div className="column is-two-fifths">
          <h1 className="note-title">{post.fields.title}</h1>
            <div className="note-content">
              <MDXRenderer>{post.body}</MDXRenderer>
            </div>
            
            <p>&nbsp;</p>

            {/* This is Binny's two-column Nav Menu layout. I'm keeping it here in case I want to quickly bring it back some day
              <div className="note-navigation columns">
                <div className="column">
                  <ul>
                    <li><Link to='/pick-a-lead-and-review-where-that-deal-is-at'>🚀 Review lead</Link></li>
                    <li><Link to='/'>👋 Welcome</Link></li>
                    <li><Link to='/how-to-use-salesflow-coach'>👨‍🎓 How to</Link></li>
                  </ul>
                </div>
                <div className="column">
                  <ul>
                    <li><Link to='/start-salesflow-coach'>🆕 Start</Link></li>
                    <li><Link to='/about-salesflow-coach'>❓ About</Link></li>
                    <li><Link to='/suppppport'>💡 Support</Link></li>                  
                  </ul>
                </div>
              </div>
            */}
            
              <div className="note-navigation columns">
                <div className="column">
                  <ul>
                    <li><Link to='/pick-a-lead-and-review-where-that-deal-is-at'>🚀 Review lead</Link></li>
                  </ul>
                </div>
              
                <div className="column">
                  <ul>
                    <li><Link to='/'>👋 Welcome</Link></li>
                  </ul>
                </div>
              
                <div className="column">
                  <ul>
                    <li><Link to='/how-to-use-salesflow-coach'>👨‍🎓 How to</Link></li>
                  </ul>
                </div>
              </div>
  
              <div className="note-meta">
            
            {/*            
              {pageContext.referredBy.length ? (
                <div className="related note-references">
                  <h5 className="block-title">Links to this note</h5>
                  <div className="related-wrapper">
                    {pageContext.referredBy.map((note, index) => (
                      <div key={index} className="related-group">
                        <Link to={`/${makeSlug(note.title)}`}>
                          <h4>{note.title}</h4>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}*/}

              {post.frontmatter.tags ? (
                <div className="related block-area">
                  <div className="related-wrapper">
                    <div className="related-group">
                      <div className="note-tags">
                        <strong className="note-meta-title">
                          Tags:{' '}
                        </strong>
                        <ul>
                          {post.frontmatter.tags.map((tag, index) => (
                            <li key={index}>
                              <Link to={`/tags/${makeSlug(tag)}`}>{tag}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div> 
                </div>
              ) : null }


            </div>

            <div className="footer-content">
              <p className="is-size-7"> SalesFlow Coach V 0.2 | Made with ❤️ by Martin Stellar | Built with <a href="https://github.com/binnyva/gatsby-garden/">Gatsby Garden</a></p>
            </div>

          </div>
        
          <div className="column is-one-and-a-half-fifths" style={{paddingRight: 3+'em'}}>

            <div className="note-graph">
              <Graph
                id="note-link-graph"
                data={graphData}
                config={graphConfig}
                onClickNode={onClickNode}
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

function Source({ src }) {
  if (!src) return null

  // :TODO: Handle a list of sources and not just a single source

  let link = ''
  if (src.includes('<a ')) {
    // Source given as HTML Link
    link = <span dangerouslySetInnerHTML={{ __html: src }}></span>
  } else if (src.includes('](')) {
    // Source given as Markdown Link - [Text](url)
    const linkParts = src.match(/\[(.+)\]\((.+)\)/)
    if (linkParts) {
      link = (
        <a href={linkParts[2]} target="_blank" rel="noreferrer">
          {linkParts[1]}
        </a>
      )
    } else {
      return null
    }
  } else if (src.includes('[[')) {
    // Source given as Wiki Link - internal link - [[Text]]
    const titleParts = src.match(/(.+)\|(.+)/) // [[Note Name|Link Text]] format.
    if (titleParts) {
      link = <Link to={'/' + makeSlug(titleParts[2])}>{titleParts[1]}</Link>
    } else {
      const title = src.replace(new RegExp(/[\[\]]/, 'g'), '') // eslint-disable-line
      link = <Link to={'/' + makeSlug(title)}>{title}</Link>
    }
  } else {
    // Just an URL given as source
    link = (
      <a href={src} target="_blank" rel="noreferrer">
        Link to Source
      </a>
    )
  }

  return (
    <p>
      <strong className="note-meta-title">Source</strong>: {link}
    </p>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        title
        date
      }
      frontmatter {
        tags
        source
      }
    }
  }
`
  