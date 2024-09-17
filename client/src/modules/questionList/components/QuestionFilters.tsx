import { useAppSelector } from '../../../common/hooks/redux';
import useToggle from '../../navBar/hooks/useToggle';

import styles from '../styles/QuestionList.module.css';


interface Props {
  activeType: string | null,
  activeDifficulty: string | null,
  setSelectedType: (type: string | null) => void,
  setSelectedDifficulty: (difficulty: string | null) => void,
}

export default function QuestionFilters({
    activeType, activeDifficulty, setSelectedType, setSelectedDifficulty
  }: Props) {
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
  };

  const handleResetFilters = () => {
    offDifficulty();
    offType();
    setSelectedDifficulty(null);
    setSelectedType(null);
  };

  const handleFilterTypeOptionClick = (type: string) => {
    toggleType();
    setSelectedType(type);
  };

  const handleFilterDifficultyOptionClick = (difficulty: string) => {
    toggleDifficulty();
    setSelectedDifficulty(difficulty);
  };

  return (
    <div className={styles.filters}>
      <h2>Filter by</h2>
      
      <button className={styles['filter-button'] } onClick={ handleResetFilters }>Reset filters</button>

      <div className={styles.filter}>
        <p 
          className={`${styles['active-filter']} ${activeType ? styles.active : ''}`}
          onClick={ () => handleToggles('type') }>Type
        </p>
        { typeToggleState &&
          <div className={styles.dropdown}>
            {questionTypes.map(qType =>
              <p
                key={qType}
                className={activeType === qType ? styles.selected: ''}
                onClick={ () => handleFilterTypeOptionClick(qType) }>{qType}
              </p>
            )}
          </div>
        }
      </div>
      
      <div className={styles.filter}>
        <p 
          className={`${styles['active-filter']} ${activeDifficulty ? styles.active : ''}`}
          onClick={ () => handleToggles('difficulty') }>Difficulty
        </p>
        { difficultyToggleState &&
          <div className={styles.dropdown}>
            {questionLevels.map(qLevel =>
              <p
              key={qLevel}
              className={activeDifficulty === qLevel ? styles.selected: ''}
              onClick={ () => handleFilterDifficultyOptionClick(qLevel) }>{qLevel}
            </p>
            )}
          </div>
        }
      </div>
    </div>
  )
};