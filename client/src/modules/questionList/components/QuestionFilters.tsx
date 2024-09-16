import { useAppSelector } from '../../../common/hooks/redux';
import useToggle from '../../navBar/hooks/useToggle';
import styles from '../styles/QuestionList.module.css';


export default function QuestionFilters() {
  const questionTypes = Array.from(new Set(useAppSelector(state => state.questions.questionBank).map(q => q.type)));
  const questionLevels = Array.from(new Set(useAppSelector(state => state.questions.questionBank).map(q => q.difficulty)));
  const [typeToggleState, { toggle: toggleType, off: offType }] = useToggle();
  const [difficultyToggleState, { toggle: toggleDifficulty, off: offDifficulty }] = useToggle();

  const handleToggles = (toggleName: string) => {
    // Ensure only one filter dropdown is displayed at a time
    if (toggleName === 'type') {
      offDifficulty();
      toggleType();
    } else if (toggleName === 'difficulty') {
      offType();
      toggleDifficulty();
    }
  }

  const handleFilterTypeOptionClick = (text: string) => {
    toggleType();
    console.log(questionTypes.filter(qt => qt === text));
  }

  const handleFilterDifficultyOptionClick = (text: string) => {
    toggleDifficulty();
    console.log(questionTypes.filter(qt => qt === text));
  }

  return (
    <div className={styles.filters}>
      <h2>Filter by</h2>
      <div className={styles.filter}>
        <p className={styles['active-filter']} onClick={ () => handleToggles('type') }>Type</p>
        { typeToggleState &&
          <div className={styles.dropdown}>
            {questionTypes.map(qType =>
              <p key={qType} onClick={ () => handleFilterTypeOptionClick(qType) }>{qType}</p>
            )}
          </div>
        }
      </div>
      
      <div className={styles.filter}>
        <p className={styles['active-filter']} onClick={ () => handleToggles('difficulty') }>Difficulty</p>
        { difficultyToggleState &&
          <div className={styles.dropdown}>
            {questionLevels.map(qLevel =>
              <p key={qLevel} onClick={ () => handleFilterDifficultyOptionClick(qLevel) }>{qLevel}</p>
            )}
          </div>
        }
      </div>
    </div>
  )
};