import React from 'react'
import { connect } from 'react-redux'
import { fetchAddCourseItem } from '../../actions.js'
import { NavLink } from 'react-router-dom'
import CKEditor from '../CKEditor/CKEditor.js'
import QuizEditor from '../QuizEditor/QuizEditor'

let Course = ({
	courseId, 
	courseItems, 
	fetchAddCourseItemClick, 
	course = {name: 'Course Name'}, // needed to render on refresh 
	sessionRole,
	children
}) =>
(
	<div className='Course' style={ {padding: '15px'} }>
		<h2> {course.name} </h2>

		{ children } {/* list course items (same children passed to Sidebar by App component) */}

		{ sessionRole === 'teacher' && // only display CKEditor if user has role 'teacher'
    	<section className='courseItemEditors'>
    		<CKEditor fetchAddCourseItemClick={ fetchAddCourseItemClick } /> 
    		<QuizEditor fetchAddCourseItemClick={ fetchAddCourseItemClick } courseItemId='' />
    	</section>
  	}
	</div>
)

const mapStateToProps = (state, ownProps) => ({
	courseId: ownProps.courseId,
	course: state.entities.courses.byId[ownProps.courseId],
	courseItems: state.entities.courseItems.allIds.map( id => state.entities.courseItems.byId[id] ).filter( courseItem => courseItem.courseId === ownProps.courseId ), // grab course items for current course
	sessionRole: state.session.role || false,
	children: ownProps.children
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchAddCourseItemClick: (courseItem) => dispatch( fetchAddCourseItem(courseItem, ownProps.courseId) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)