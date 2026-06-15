import LinkRow from './LinkRow.jsx';
import './LinkTable.css';

export default function LinkTable({ links, loading, onDelete, onShowQR }) {
  if (loading) {
    return <p className="table-status">loading...</p>;
  }

  if (!links.length) {
    return <p className="table-status">no links yet.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="link-table">
        <thead>
          <tr>
            <th>code</th>
            <th>qr</th>
            <th>url</th>
            <th>created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <LinkRow
              key={link.name}
              link={link}
              onDelete={onDelete}
              onShowQR={onShowQR}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
