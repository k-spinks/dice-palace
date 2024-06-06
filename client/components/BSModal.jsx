import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'bootstrap'

export default function BSModal (props) {
  const { title, children, isOpen, onClose } = props
  const modalRef = useRef()
  const [modalObj, setModalObj] = useState(null)

  useEffect(() => {
    if (modalRef.current && modalObj === null) {
      setModalObj(new Modal(modalRef.current, { backdrop: 'static' }))
    }
  }, [modalObj])

  useEffect(() => {
    if (modalObj !== null) {
      if (isOpen) {
        modalObj.show()
      } else {
        modalObj.hide()
      }
    }
  }, [isOpen, modalObj])

  return (
    <div ref={modalRef} className="modal fade modal-xl">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="detailsModalLabel">
              {title}
            </h1>

            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body" id="detailsModalBody">
            {children}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              {'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

BSModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

BSModal.defaultProps = {
  title: 'N/A',
  children: null
}
