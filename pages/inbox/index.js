import { useEffect, useState, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { withRouter } from 'next/router';
import { Spinner } from 'react-awesome-spinners';
import EmailBar from '../../components/EmailBar';
import axios from 'axios';

const Inbox = (props) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState([]);
  const [oneMail, setOneMail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [openReply, setOpenReply] = useState(false);
  const [openForward, setOpenForward] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post('/api/checkmail', {
        user: props.router.query.user,
        password: props.router.query.password,
      })
      .then((response) => {
        let rvs = response.data.envelope;
        setMail(rvs.reverse());
        // console.log(rvs);
        setUser(response.data.user);
        setPassword(response.data.password);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  async function handleClick(event) {
    setOneMail('');
    event.preventDefault();
    axios
      .post('/api/readmail', {
        user: user,
        password: password,
        id: event.target.id,
      })
      .then((response) => {
        setOneMail(response.data.mail);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  function theMail() {
    return (
      <div>
        <div
          className='container'
          dangerouslySetInnerHTML={{ __html: oneMail }}
          sandbox=''
        />
      </div>
    );
  }

  function IFrame({ children }) {
    const [ref, setRef] = useState();
    const container = ref?.contentWindow?.document?.body;

    return (
      <iframe
        ref={setRef}
        className='border-b-2 border-l-2 border-r-2 border-t-2 border-gray-600 overflow-y-auto'
        width='100%'
        height='100%'
        sandbox='allow-scripts allow-same-origin'
      >
        {container && createPortal(children, container)}
      </iframe>
    );
  }

  function RenderingInFrames() {
    return <IFrame>{theMail()}</IFrame>;
  }

  function logOut() {
    props.router.push('/');
  }

  function seenMarker(flags) {
    if (flags === '\\Seen') {
      return 'hover:bg-sky-700 font-weight-bold font-mono';
    } else {
      return 'hover:bg-sky-700 font-mono bg-gray-200 font-2xl';
    }
  }

  function EmailData(props) {
    const { uid, date, from, subject, flags } = props.data;
    return (
      <ul className='p-2'>
        <li
          key={uid}
          id={uid}
          className={seenMarker(flags)}
          onClick={handleClick}
        >
          <h3 id={uid}>{subject}</h3>
          <p id={uid}>{from}</p>
          <p id={uid}>{date}</p>
        </li>
      </ul>
    );
  }

  function PaginateEmails() {
    return (
      <Pagination
        data={mail}
        RenderComponent={EmailData}
        pageLimit={5}
        dataLimit={7}
      />
    );
  }

  function Pagination({ data, RenderComponent, pageLimit, dataLimit }) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, [currentPage]);

    function goToNextPage() {
      setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
      setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
      const pageNumber = Number(event.target.textContent);
      setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
      const startIndex = currentPage * dataLimit - dataLimit;
      const endIndex = startIndex + dataLimit;
      return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
      let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
      return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    function showPaginateNav() {
      if (pages <= 1) return null;
      else if (pages > 1)
        return (
          <div className='grid grid-flow-col'>
            <div />
            <div className='pagination'>
              {/* previous button */}
              <button
                onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
              >
                Sebelumnya
              </button>

              {/* show page numbers */}
              {getPaginationGroup().map((item, index) => (
                <button
                  key={index}
                  onClick={changePage}
                  className={`paginationItem ${
                    currentPage === item ? 'active' : null
                  }`}
                >
                  <span>{item}</span>
                </button>
              ))}

              {/* next button */}
              <button
                onClick={goToNextPage}
                className={`next ${currentPage === pages ? 'disabled' : ''}`}
              >
                Seterusnya
              </button>
            </div>
            <div />
          </div>
        );
    }

    return (
      <div>
        <div className='dataContainer'>
          {getPaginatedData().map((d, idx) => (
            <RenderComponent key={idx} data={d} />
          ))}
        </div>
        {showPaginateNav()}
      </div>
    );
  }

  if (loading)
    return (
      <div className='container text-center h-auto border-l-blue-400'>
        <br />
        <br />
        <p className='text-center font-mono text-2xl'>
          {props.router.query.user}@calypsocloud.one
        </p>
        <br />
        <p className='text-center font-mono text-2xl'>Loading...</p>
        <br />
        <Spinner />
      </div>
    );
  if (error) return <p className='text-center font-mono text-2xl'>{error}</p>;
  if (!mail) return <p>No mail here boi</p>;

  return (
    <div className='grid grid-cols-2'>
      <div>
        <div className='p-2'>
          <button
            className='left-1/3 top-0 mt-1 absolute px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
            onClick={logOut}
          >
            Log Out
          </button>
          <h1>{user}</h1>
        </div>
        <PaginateEmails />
      </div>
      <div>
        <EmailBar openReply={openReply} setOpenReply={setOpenReply} />
        <RenderingInFrames />
      </div>
    </div>
  );
};

export default withRouter(Inbox);
