import React, {useState} from 'react';
import Form from '../components/Shorten/Form';
import ShortUrlResult from '../components/Shorten/ShortUrlResult';

const Shorten = ({homeLink}) => {
  const [mainUrl, setMainUrl] = useState("")
  const [shortId, setShortId] = useState("");
  
  return (
    <div>
      <Form homeLink={homeLink} mainUrl={mainUrl} setMainUrl={setMainUrl} shortId={shortId} setShortId={setShortId} />
      <ShortUrlResult mainUrl={mainUrl} shortId={shortId} />
    </div>
  )
}

export default Shorten
